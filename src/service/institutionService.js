const stripe = require("stripe")(
  "sk_test_51NV9VgFgObjlCeyVdynrz3xEvG3d9bG8UtQs7SKomy6mpX2miMsrYhAgGSVixzSma76jNY06sJ1k6S5HhU69rSVw00rFiAG8O3"
);
const entities = require("../models");

const Institution = entities.Institution;
const Payment = entities.Payment;
const GroupTicket = entities.GroupTicket;
const Bus = entities.Bus;
const Booking = entities.Booking;
const emailSender = require("../utils/email");

// update institution details
async function updateInstitution(id, updateData) {
  try {
    const institution = await Institution.findByPK(id);

    if (!institution) {
      return { error: "Institution not found" };
    }

    await institution.update(updateData);

    return { institution };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get institution by Id
async function getInstitutionById(id) {
  try {
    const institution = await Institution.findByPk(id);

    if (!institution) {
      return { error: "Institution not found" };
    }

    return { institution };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get institutions
async function getInstitutions() {
  try {
    const institutions = await Institution.findAll();

    return { institutions };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// provide group travel information
async function requestBus(travelPlan) {
  const destinationLocation = travelPlan.destinationLocation;
  const sourceLocation = travelPlan.sourceLocation;
  const departureDate = travelPlan.departureDate;
  const emailOfInstitution = travelPlan.emailOfInstitution;
  const numberOfPeople = travelPlan.numberOfPeople;
  const busId = travelPlan.busId;

  const route = sourceLocation + " heading :  " + destinationLocation;

  try {
    // find the institution
    const institution = await Institution.findOne({
      where: { emailOfInstitution },
    });

    if (!institution) {
      return { error: "email not found. Account does not exist" };
    }

    const id = busId;
    // find bus
    const bus = await Bus.findByPk(id);

    if (!bus) {
      return { error: "Bus not found." };
    }

    // find if there is any instititution with the same bus Id and date
    const sameBusDate = await Institution.findAll({
      where: { busId, departureDate },
    });

    if (sameBusDate.length > 0) {
      return { error: "Bus already taken. Choose another bus or date" };
    }

    if (numberOfPeople <= bus.capacity) {
      // update the number of people
      await institution.update({ numberOfPeople, route, departureDate, busId });
    } else {
      return { error: "Number of people entered is more than bus capacity" };
    }

    // send email
    emailSender.sendCompanyWelcomeEmail(emailOfInstitution);

    return {
      msg: "Thank You so much we will send you an email in less than 3 hrs",
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// process payment and create booking history
async function processPayment(paymentData, paymentMethodId) {
  const emailOfInstitution = paymentData.email;
  const amount = paymentData.amount;

  try {
    // get institution
    const institution = await Institution.findOne({
      where: { emailOfInstitution },
    });

    if (amount < institution.amount) {
      return { error: "Insufficient funds provided" };
    }

    const busId = institution.busId;

    const bus = await Bus.findOne({ where: { id: busId } });

    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires amount in cents
      currency: "mwk", // Malawi Kwacha
      payment_method: paymentMethodId, // Use paymentMethodId instead of source
      description: "Payment for Ticket",
      confirm: true, // Confirm the payment intent immediately
    });

    if (!paymentIntent) {
      return { error: "Stripe payment intent never happened" };
    }

    // Create a payment record in the database
    const payment = await Payment.create({
      paymentDate: new Date(),
      paymentAmount: amount,
      paymentMethod: "card",
      institutionId: paymentData.institutionId,
    });

    if (!payment) {
      return { error: "Payment records not created" };
    }

    // create a booking history
    const booking = await Booking.create({
      institutionId: institution.id,
      busId: busId,
      institutionEmail: emailOfInstitution,
      contactOfInstitution: institution.contactOfInstitution,
      route: institution.route,
      departureDate: institution.departureDate,
      paymentDate: payment.paymentDate,
      paymentAmount: payment.paymentAmount,
      paymentMethod: payment.paymentMethod,
    });

    // create group ticket
    const groupTicket = await GroupTicket.create({
      groupName: institution.name,
      groupSize: institution.numberOfPeople,
      institutionId: institution.id,
    });

    // send email
    emailSender.sendGroupTicketInformation(
      groupTicket,
      emailOfInstitution,
      bus,
      institution
    );

    return { msg: "Payment succeeded" };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

module.exports = {
  processPayment,
  requestBus,
  getInstitutionById,
  getInstitutions,
  updateInstitution,
};

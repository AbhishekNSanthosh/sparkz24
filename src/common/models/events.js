import mongoose, { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  name: {
    type: String,
    require: [true, "Event is required"],
  },
  price: {
    first: { type: String, require: [true, "first is required"] },
    second: { type: String },
    third: { type: String },
  },
  department: { type: String, require: [true, "depatment is required"] },
  date: { type: String, require: [true, "date is required"] },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;

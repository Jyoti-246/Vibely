import mongoose from "mongoose";

// Auto-increment numeric ids so documents keep the same integer id style the
// frontend relies on (===, Number(), .in() lists) after leaving Supabase.
const counterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

export async function nextId(name) {
  const doc = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );
  return doc.seq;
}

// After migrating rows that already carry ids, bump the counter past the max.
export async function setCounterAtLeast(name, value) {
  await Counter.findByIdAndUpdate(
    name,
    { $max: { seq: value } },
    { upsert: true },
  );
}

export { Counter };

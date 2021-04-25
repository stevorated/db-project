import mongoose from 'mongoose';

const daySchema = new mongoose.Schema({
  date: Date,
  open: Number,
  close: Number,
  high: Number,
  low: Number,
  openUSD: Number,
  closeUSD: Number,
  highUSD: Number,
  lowUSD: Number,
});

export const Day = mongoose.model('days', daySchema);

export const deleteAllDays = async () => {
  try {
    await Day.deleteMany();
    console.log('All Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
};

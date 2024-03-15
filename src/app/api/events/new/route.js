import Event from "@/models/events";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { name, price, department, date } = await request.json();

  try {
    await connectToDB();
    const newEvent = new Event({ name, price, department, date });

    await newEvent.save();
    return new Response(JSON.stringify(newEvent), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};

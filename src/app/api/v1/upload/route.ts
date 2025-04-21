import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config(process.env.CLOUDINARY_URL!);

export async function POST(req: NextRequest, res: NextResponse) {
  const { file } = await req.json();

  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "buddybase/posts",
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    return NextResponse.json({ error: "Cloudinary upload failed." }, { status: 500 });
  }
}

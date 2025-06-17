import { NextResponse } from "next/server";
import { useFetchGqlAdmin } from "@/lib/api/graphql";
import { CREATE_USER_WITH_PASSWORD, GET_USER_BY_EMAIL } from "@/lib/api/api-auth";
import { hashPassword } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json();
    // YOU MAY WANT TO ADD SOME VALIDATION HERE
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const userData = await useFetchGqlAdmin(GET_USER_BY_EMAIL, { email });
    const existingUser = userData.data[0];

    // Sign up flow
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUserData = await useFetchGqlAdmin(CREATE_USER_WITH_PASSWORD, {
      email,
      name: firstName + " " + lastName,
      password: hashedPassword,
      profile: {
        first_name: firstName,
        last_name: lastName,
      },
    });

    return NextResponse.json({
      message: "success",
      data: {
        id: newUserData.data?.id,
        email: newUserData.data?.email,
        name: newUserData.data?.name,
        image: newUserData.data?.image,
      },
    });
  } catch (e) {
    return NextResponse.json({ message: "error", error: e }, { status: 500 });
  }
}

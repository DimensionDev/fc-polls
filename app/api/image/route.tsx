import * as fs from "fs";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { join } from "path";

import { PollCard } from "@/components/PollCard";
import { Theme } from "@/constants/theme";
import { createErrorResponseJSON } from "@/helpers/createErrorResponseJSON";
import { getPoll } from "@/services/getPoll";

const fontPath = join(process.cwd(), "./assets/Roboto-Regular.ttf");
const fontData = fs.readFileSync(fontPath);

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const pollId = searchParams.get("id");
		const showResults = searchParams.get("results") === "true";
		const hideTitle = searchParams.get("hideTitle") === "true";
		const theme = searchParams.get("theme");

		if (!pollId) {
			return createErrorResponseJSON("Missing poll ID");
		}

		const poll = await getPoll(pollId);
		if (!poll) {
			return createErrorResponseJSON("Missing poll ID");
		}

		return new ImageResponse(
			<PollCard
				poll={poll}
				showResults={showResults}
				hideTitle={hideTitle}
				theme={theme === Theme.Dark ? Theme.Dark : Theme.Light}
			/>,
			{
				width: 600,
				height: 400,
				fonts: [
					{
						data: fontData,
						name: "Roboto",
						style: "normal",
						weight: 400,
					},
				],
			}
		)
	} catch (error) {
		return createErrorResponseJSON("Failed to generate poll data");
	}
}

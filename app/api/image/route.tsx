import { ComposedPoll } from "@/app/types";
import { kv } from "@vercel/kv";
import { join } from "path";
import * as fs from "fs";
import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { createErrorResponseJSON } from "@/helpers/createErrorResponseJSON";
import { PollCard } from "@/components/PollCard";
import { Theme } from "@/constants/theme";

const fontPath = join(process.cwd(), "Roboto-Regular.ttf");
const fontData = fs.readFileSync(fontPath);

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const pollId = searchParams.get("id");
		const showResults = searchParams.get("results") === "true";
		const hideTitle = searchParams.get("hideTitle") === "true";
		const fid = parseInt(searchParams.get('fid')?.toString() || '')
		const theme = searchParams.get("theme");

		if (!pollId) {
			return createErrorResponseJSON("Missing poll ID", { status: 400 });
		}

		const poll: ComposedPoll | null = await kv.hgetall(`poll:${pollId}`);
		if (!poll) {
			return createErrorResponseJSON("Missing poll ID", { status: 400 });
		}

		let votedOption: number | null = null
		if (showResults && fid > 0) {
			votedOption = await kv.hget(`poll:${pollId}:voted`, `${fid}`) as number
		}

		return new ImageResponse(
			<PollCard
				poll={poll}
				showResults={showResults}
				hideTitle={hideTitle}
				theme={theme === Theme.Dark ? Theme.Dark : Theme.Light}
				votedOption={votedOption}
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
		return createErrorResponseJSON("Failed to generate poll data", {
			status: 500,
		});
	}
}

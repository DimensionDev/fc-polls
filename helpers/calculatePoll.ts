import { Poll } from "@/app/types";

export const calculatePoll = (poll: Poll) => {
    const options = Object.keys(poll)
        .filter((key) => key.startsWith("option"))
        .map((key) => poll[key as `option${number}`]);
    const totalVotes = options.reduce((acc, _, index) => {
        return acc + Number(poll[`votes${index + 1}`]);
    }, 0)

    return options.map((option, index) => {
        const votes = poll[`votes${index + 1}`];
        const percentOfTotal = totalVotes
            ? Math.round((votes / totalVotes) * 100)
            : 0;

        return { option, votes, percentOfTotal }
    })
}

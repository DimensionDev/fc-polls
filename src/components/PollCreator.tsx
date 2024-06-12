'use client';

import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { MIN_VALID_IN_DAYS } from '@/constants';
import { POLL_CHOICE_TYPE } from '@/constants/enum';
import { useTranslate } from '@/hooks/useTranslate';
import { savePoll } from '@/services/savePoll';

const defaultOptions = [1, 2, 3, 4];

// NOTICE: Just for development
export function PollCreator() {
    const [loading, setLoading] = useState<boolean>(false);
    const t = useTranslate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const question = formData.get('question') as string;
            const options = defaultOptions.map((option) => formData.get(`option${option}`) as string);
            if (!question || options.some((option) => !option)) {
                alert(t`Please fill all fields`);
                return;
            }
            setLoading(true);
            const pollId = await savePoll(
                {
                    options: options.map((text) => ({ text, id: uuid(), votes: 0 })),
                    duration: { days: MIN_VALID_IN_DAYS, hours: 0, minutes: 0 },
                    type: POLL_CHOICE_TYPE.Single,
                    strategies: '[]',
                },
                question,
            );
            window.location.href = `/polls/${pollId}`;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert(t`An error occurred: ${error}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className=" flex w-[500px] flex-col rounded-md bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
            <label className="flex gap-1">
                <span className="w-20 text-right">{t`Question`}:</span>
                <input className="h-9 flex-1 bg-slate-100 px-2" type="text" name="question" />
            </label>
            {defaultOptions.map((option) => (
                <label key={option} className="mt-2 flex gap-1">
                    <span className="w-20 text-right">{t`Option ${option}`}:</span>
                    <input className=" h-9 flex-1 bg-slate-100 px-2" type="text" name={`option${option}`} />
                </label>
            ))}
            <button type="submit" className="mt-4 h-9 rounded-md bg-blue-500 text-white">
                {loading ? t`Creating...` : t`Create Poll`}
            </button>
        </form>
    );
}

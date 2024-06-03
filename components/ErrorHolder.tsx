interface ErrorHolderProps {
    text?: string
}

export function ErrorHolder({ text }: ErrorHolderProps) {
    return <div>
        {text ?? 'Unknown Error'}
    </div>
}

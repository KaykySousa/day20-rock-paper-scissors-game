import { ButtonHTMLAttributes } from "react"

interface GameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	action: "rock" | "paper" | "scissors"
}

export default function GameButton({
	action,
	className,
	...props
}: GameButtonProps) {
	const themes = {
		rock: "bg-red-500 hover:bg-red-600",
		paper: "bg-blue-500 hover:bg-blue-600",
		scissors: "bg-amber-500 hover:bg-amber-600",
	}

	return (
		<button
			className={`h-36 w-36 p-4 rounded-full transition-colors ${themes[action]} ${className}`}
			{...props}
		>
			<div className="bg-neutral-50 w-full h-full rounded-full shadow-[inset_0px_0px_4px_0px_#00000060] flex justify-center items-center">
				<img src={`/assets/icon-${action}.svg`} alt={action} />
			</div>
		</button>
	)
}

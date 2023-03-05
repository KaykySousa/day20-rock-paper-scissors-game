import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, ...props }: ButtonProps) {
	return (
		<button
			className={`h-12 bg-neutral-50 text-slate-900 font-semibold px-6 rounded shadow text-lg ${className}`}
			{...props}
		/>
	)
}

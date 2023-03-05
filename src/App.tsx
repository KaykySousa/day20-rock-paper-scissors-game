import { useState } from "react"
import Button from "./components/Button"
import DeveloperInfo from "./components/DeveloperInfo"
import GameButton from "./components/GameButton"
import { Actions, Status } from "./types/game"

export default function App() {
	const [playerAction, setPlayerAction] = useState<Actions | null>(null)
	const [computerAction, setComputerAction] = useState<Actions | null>(null)
	const [status, setStatus] = useState<Status | null>(null)
	const actions: Actions[] = ["rock", "paper", "scissors"]

	function handleActions(playerAction: Actions) {
		const computerAction =
			actions[Math.floor(Math.random() * actions.length)]

		let randomAnimationIndex = Math.floor(Math.random() * actions.length)
		let animationIndex = 0

		const interval = setInterval(() => {
			randomAnimationIndex++

			setPlayerAction(actions[randomAnimationIndex % actions.length])
			setComputerAction(
				actions[(randomAnimationIndex + 1) % actions.length]
			)
			animationIndex++

			if (animationIndex >= 6) {
				clearInterval(interval)
				setComputerAction(computerAction)
				setPlayerAction(playerAction)

				const status = checkWinner(playerAction, computerAction)
				setStatus(status)
			}
		}, 500)
	}

	function playAgain() {
		setPlayerAction(null)
		setComputerAction(null)
		setStatus(null)
	}

	function checkWinner(playerAction: Actions, computerAction: Actions) {
		const possibilities = {
			rock: {
				rock: "draw",
				paper: "lose",
				scissors: "win",
			},
			paper: {
				rock: "win",
				paper: "draw",
				scissors: "lose",
			},
			scissors: {
				rock: "lose",
				paper: "win",
				scissors: "draw",
			},
		}

		return possibilities[playerAction][computerAction] as Status
	}

	if (!playerAction || !computerAction) {
		return (
			<div className="min-h-screen w-full bg-[radial-gradient(circle_at_center,#334155,#0f172a)] flex flex-col justify-center items-center p-6">
				<div className="max-w-lg w-full flex flex-col gap-y-8 justify-center items-center">
					<p className="text-4xl text-neutral-50 font-bold text-center">
						SELECT YOUR MOVE
					</p>
					<div className="flex gap-x-6 gap-y-3 flex-wrap items-center justify-center">
						{actions.map((action, index) => (
							<GameButton
								key={index}
								action={action}
								onClick={() => {
									handleActions(action)
								}}
							/>
						))}
					</div>
					<DeveloperInfo />
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen w-full bg-[radial-gradient(circle_at_center,#334155,#0f172a)] flex flex-col justify-center items-center p-6">
			<div className="max-w-lg w-full flex flex-col justify-center items-center">
				<div className="w-full flex justify-center items-center gap-8 flex-col min-[512px]:flex-row">
					<div className="flex flex-col justify-center items-center gap-y-4">
						<p className="text-neutral-50 font-bold text-center">
							YOU PICKED
						</p>
						<GameButton
							action={playerAction}
							className="min-[512px]:!h-40 min-[512px]:!w-40"
						/>
					</div>

					<p className="text-5xl text-neutral-50 font-bold text-center min-[512px]:-mb-8">
						VS
					</p>

					<div className="flex flex-col-reverse justify-center items-center gap-y-4 min-[512px]:flex-col">
						<p className="text-neutral-50 font-bold text-center">
							THE HOUSE PICKED
						</p>
						<GameButton
							action={computerAction}
							className="min-[512px]:!h-40 min-[512px]:!w-40"
						/>
					</div>
				</div>
				{status && (
					<div className="flex flex-col items-center justify-center">
						<p className="text-4xl text-neutral-50 font-bold mt-8 uppercase mb-4 text-center">
							{status !== "draw" ? "YOU " : ""}
							{status}
						</p>
						<Button onClick={playAgain}>PLAY AGAIN</Button>
					</div>
				)}
			</div>
		</div>
	)
}

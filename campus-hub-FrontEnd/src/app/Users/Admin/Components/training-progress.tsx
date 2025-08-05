import { ProgressBar } from "./progress-bar"

interface TrainingProgressProps {
  progress: number
}

export function TrainingProgress({ progress }: TrainingProgressProps) {
  return (
    <div className="mt-4">
      <ProgressBar progress={progress} />
      <p className="text-center mt-2">{progress}% Complete</p>
    </div>
  )
}


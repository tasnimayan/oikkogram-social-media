import { ChevronDown, ChevronUp, Hash, Minimize, RefreshCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import axios from "axios";
import { cn } from "@/lib/utils";

type ToneType = "casual" | "professional" | "friendly" | "enthusiastic" | "formal";
const toneOptions: { value: ToneType; label: string }[] = [
  { value: "casual", label: "Casual" },
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "enthusiastic", label: "Enthusiastic" },
  { value: "formal", label: "Formal" },
];

export function PostAssistant({ onGenerate }: { onGenerate: (text: string) => void }) {
  const [prompt, setPrompt] = useState("");
  const [selectedTone, setSelectedTone] = useState<ToneType | null>(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleGenerate = async (type: string) => {
    if (!prompt) return;

    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/post-assistant", {
        text: prompt,
        promptType: type,
        tone: selectedTone,
      });
      onGenerate(data.result);
    } catch (error) {
      console.error("Error generating post:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 p-4 space-y-3 rounded border">
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="icon"
          type="button"
          className="w-full justify-start px-2"
          onClick={() => setShow(!show)}
        >
          <Sparkles className={`h-4 w-4 text-purple-500 ${loading ? "animate-spin" : ""}`} />
          AI Enhancements
          <span className="ml-auto">
            {show ? (
              <ChevronUp className="h-4 w-4 text-purple-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-purple-500" />
            )}
          </span>
        </Button>
      </div>
      <div className={cn("transition-all duration-200", show ? "max-h-96" : "max-h-0 overflow-hidden")}>
        <textarea
          value={prompt}
          disabled={loading}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button onClick={() => handleGenerate("generate")} disabled={loading} variant="outline">
            <Sparkles className="text-purple-600 size-6" />
            Generate
          </Button>

          <Button onClick={() => handleGenerate("improve")} disabled={loading} variant="outline">
            <RefreshCcw className="text-blue-600 size-6" />
            Improve
          </Button>

          <Button onClick={() => handleGenerate("hashtags")} disabled={loading} variant="outline">
            <Hash className="text-green-600 size-6" />
            Hashtags
          </Button>

          <Button onClick={() => handleGenerate("summarize")} disabled={loading} variant="outline">
            <Minimize className="text-orange-600 size-6" />
            Summarize
          </Button>
        </div>

        <div className="space-y-2 mt-4">
          <label className="block text-sm font-medium text-gray-700">Select Tone</label>
          <div className="flex flex-wrap gap-2">
            {toneOptions.map(tone => (
              <button
                type="button"
                key={tone.value}
                onClick={() => setSelectedTone(tone.value)}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedTone === tone.value
                    ? "bg-purple-100 text-purple-700 border border-purple-300"
                    : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {tone.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

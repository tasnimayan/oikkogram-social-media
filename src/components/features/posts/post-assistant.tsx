import { LuSparkles } from "react-icons/lu";
import { HiOutlineRefresh, HiOutlineHashtag } from "react-icons/hi";
import { MdSwitchAccessShortcut } from "react-icons/md";
import { Loader2, Sparkles } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Button } from "../../ui/button";
import axios from "axios";
import { PostSchemaType } from "@/lib/schemas/createPostSchema";

type ToneType = "casual" | "professional" | "friendly" | "enthusiastic" | "formal";
const toneOptions: { value: ToneType; label: string }[] = [
  { value: "casual", label: "Casual" },
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "enthusiastic", label: "Enthusiastic" },
  { value: "formal", label: "Formal" },
];

export function PostAssistant() {
  const [result, setResult] = useState("");
  const [selectedTone, setSelectedTone] = useState<ToneType | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useFormContext<PostSchemaType>();

  const handleGenerate = async (type: string) => {
    const content = form.getValues("content");
    if (!content) return;

    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/post-assistant", {
        text: content,
        promptType: type,
        tone: selectedTone,
      });
      setResult(data.result);
    } catch (error) {
      console.error("Error generating post:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 p-4 space-y-3 rounded border">
      <h3 className="text-sm font-medium flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-purple-500" />
        AI Enhancements
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button onClick={() => handleGenerate("generate")} disabled={loading} variant="outline">
          <LuSparkles className="text-purple-600 size-6" />
          Generate
        </Button>

        <Button onClick={() => handleGenerate("improve")} disabled={loading} variant="outline">
          <HiOutlineRefresh className="text-blue-600 size-6" />
          Improve
        </Button>

        <Button onClick={() => handleGenerate("hashtags")} disabled={loading} variant="outline">
          <HiOutlineHashtag className="text-green-600 size-6" />
          Hashtags
        </Button>

        <Button onClick={() => handleGenerate("summarize")} disabled={loading} variant="outline">
          <MdSwitchAccessShortcut className="text-orange-600 size-6" />
          Summarize
        </Button>
      </div>

      <div className="space-y-2 mt-4">
        <label className="block text-sm font-medium text-gray-700">Select Tone</label>
        <div className="flex flex-wrap gap-2">
          {toneOptions.map((tone) => (
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

      {loading ? <Loader2 className="size-10 animate-spin" /> : result && <div className="p-2 bg-gray-100 rounded">{result}</div>}
    </div>
  );
}

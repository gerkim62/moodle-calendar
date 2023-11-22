import { calendarLinkSubmit } from "@/actions";
import Submit from "@/components/Submit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { domain, authtoken, moodleuserid: moodleUserId } = searchParams;
  const url = `https://${domain}/calendar/export_execute.php?userid=${moodleUserId}&authtoken=${authtoken}&preset_what=all&preset_time=recentupcoming`;
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto p-6 md:bg-white rounded-lg text-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
          eLearning Calendar
        </h1>
        <p className="text-gray-600 mb-6">
          This utility app will scan your eLearning platform and find all
          upcoming events such as quizzes, assignments, discussions, and more.
        </p>
        <form action={calendarLinkSubmit} className="max-w-sm mx-auto">
          <input
            required
            name="link"
            placeholder="Paste eLearning calendar link here..."
            className="border border-gray-300 rounded-l px-4 py-2 w-full mb-4"
            type="hidden"
            value={url}
          />
           <div className="grid w-full max-w-sm items-center gap-1.5">
            {/* <Label htmlFor="email">Email</Label> */}
            <Input type="email" id="email" placeholder="Email" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            {/* <Label htmlFor="email">Email</Label> */}
            <Input type="email" id="email" placeholder="Email" />
          </div>

          <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
        </form>
        <div className="space-y-4">{/* Add more links here */}</div>
      </div>
    </div>
  );
}

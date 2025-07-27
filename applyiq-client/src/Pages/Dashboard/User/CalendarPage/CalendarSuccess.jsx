import { useSearchParams } from "react-router";

const CalendarSuccess = () => {

  const [params] = useSearchParams();
  console.log(params);
  const token = params.get("access_token");

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-green-600">✅ Connected to Google Calendar</h2>
      <p>Access token: {token}</p>
    </div>
  );
};
export default CalendarSuccess

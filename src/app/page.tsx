import OTP from '@/components/OTP';

export default function Home() {
  return (
    <div className="mt-8 ml-6 w-[700px] bg-amber-50 p-8">
      <OTP digits={6} />
    </div>
  );
}

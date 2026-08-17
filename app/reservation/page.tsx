export default function ReservationPage() {
  return (
    <main className="reservation-page">
      <iframe
        className="reservation-frame"
        src="https://reserve.intelis.pt/chuanyue"
        title="Chuan Yue table reservation"
        allow="payment"
      />
    </main>
  );
}

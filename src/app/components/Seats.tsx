const Seats = ({
  seat,
  setSeatAlert,
  seatAlert,
  addAndRemove,
  selected,
}: {
  seat: any;
  setSeatAlert: (obj: any) => void;
  seatAlert: any[];
  addAndRemove: (id: string) => void;
  selected: string[];
}) => {
  return (
    <div
      key={seat.id}
      className=""
      onClick={() => {
        if (seat.is_booked) {
          setSeatAlert([
            ...seatAlert,
            {
              type: "bad",
              text: "This seat has been booked",
            },
          ]);
          setTimeout(() => {
            setSeatAlert([]);
          }, 2000);
        } else {
          addAndRemove(seat.id);
        }
      }}
    >
      {seat.is_booked === true ? (
        <img src="/img/seat-car-red.svg" alt="" className="h-10" />
      ) : selected.includes(seat.id) ? (
        <img src="/img/seat-car-blue.svg" alt="" className="h-10" />
      ) : (
        <img src="/img/seat-car-green.svg" alt="" className="h-10" />
      )}
    </div>
  );
};

export default Seats;

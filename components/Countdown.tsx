'use client';

import { useEffect, useState } from 'react';

type CountdownProps = {
  targetDate: string;
};

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    function calculateTimeLeft() {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
      });
    }

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="invitation-countdown">
      <div>
        <strong>{timeLeft.days}</strong>
        <span>Días</span>
      </div>

      <div>
        <strong>{String(timeLeft.hours).padStart(2, '0')}</strong>
        <span>Horas</span>
      </div>

      <div>
        <strong>{String(timeLeft.minutes).padStart(2, '0')}</strong>
        <span>Minutos</span>
      </div>
    </div>
  );
}
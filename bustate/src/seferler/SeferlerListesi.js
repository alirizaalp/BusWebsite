import React, { useState } from 'react';
import './SeferlerListesi.css';
import { useNavigate } from 'react-router-dom';

function SeferlerListesi({ seferler }) {
  const [seciliSeferler, setSeciliSeferler] = useState([]);
  const [alınanBiletler, setAlınanBiletler] = useState([]);
  const [koltuklarGoster, setKoltuklarGoster] = useState(false);
  const navigate = useNavigate();
  const [odemeBilgileri, setOdemeBilgileri] = useState({
    kartNo: '',
    sonKullanimTarihi: '',
    cvc: '',
  });
  const [odemeTamamlandi, setOdemeTamamlandi] = useState(false);
  const [odemeHatasi, setOdemeHatasi] = useState(false);

  const toggleSefer = (seferId) => {
    if (seciliSeferler.includes(seferId)) {
      setSeciliSeferler(seciliSeferler.filter((id) => id !== seferId));
    } else {
      setSeciliSeferler([...seciliSeferler, seferId]);
    }
  };

  const handleBiletAl = () => {
    const yeniBiletler = [...alınanBiletler, ...seciliSeferler];
    setAlınanBiletler(yeniBiletler);
    setSeciliSeferler([]);
    setKoltuklarGoster(true);
  };

  const handleOdemeBilgileriDegisiklik = (e) => {
    const { name, value } = e.target;
    setOdemeBilgileri({
      ...odemeBilgileri,
      [name]: value,
    });
  };

  const handleOdemeYap = () => {
    if (!odemeBilgileri.kartNo || !odemeBilgileri.sonKullanimTarihi || !odemeBilgileri.cvc) {
      setOdemeHatasi(true);
      return;
    }


    console.log('Ödeme Bilgileri:', odemeBilgileri);


    setOdemeTamamlandi(true);
  };

  const renderKoltuklar = (biletSayisi) => {
    const koltuklar = [];
    for (let i = 0; i < biletSayisi; i++) {
      const koltukListesi = [...Array(15)].map((_, index) => (
        <div key={index} className="koltuk">
          Seat {index + 1}
        </div>
      ));
      koltuklar.push(
        <div key={i}>
          <h2>Seat Selection - Ticket {i + 1}</h2>
          <p>Please choose your seat:</p>
          <div className="koltuklar-container">{koltukListesi}</div>
        </div>
      );
    }
    return koltuklar;
  };

  return (
    <div>
      <h1>List of Bus Services</h1>
      {koltuklarGoster ? (
        <div>
          <h2>Tickets Received</h2>
          <ul>
            {alınanBiletler.map((seferId, index) => {
              const seferDetay = seferler.find((sefer) => sefer.id === seferId);
              return (
                <li key={index}>
                  {seferDetay.guzergah} - {seferDetay.tarih} - {seferDetay.gun} - {seferDetay.saat} - {seferDetay.fiyat}
                </li>
              );
            })}
          </ul>
          {renderKoltuklar(alınanBiletler.length)}
          <h2>Pay Information</h2>
          <form>
            <label>Card Number:</label>
            <input
              type="text"
              name="kartNo"
              value={odemeBilgileri.kartNo}
              onChange={handleOdemeBilgileriDegisiklik}
            />
            <label>Expiration Date:</label>
            <input
              type="text"
              name="sonKullanimTarihi"
              value={odemeBilgileri.sonKullanimTarihi}
              onChange={handleOdemeBilgileriDegisiklik}
            />
            <label>CVC:</label>
            <input
              type="text"
              name="cvc"
              value={odemeBilgileri.cvc}
              onChange={handleOdemeBilgileriDegisiklik}
            />
          </form>
          <button onClick={handleOdemeYap}>Pay Up</button>
          {odemeHatasi && <p>Please fill in the required places.</p>}
          {odemeTamamlandi && <p>The Payoff was Completed Successfully!</p>}
        </div>
      ) : (
        <ul>
          {seferler.map((sefer) => (
            <li key={sefer.id}>
              <input
                type="checkbox"
                checked={seciliSeferler.includes(sefer.id)}
                onChange={() => toggleSefer(sefer.id)}
              />
              <strong>The Route:</strong> {sefer.guzergah}
              <br />
              <strong>Date:</strong> {sefer.tarih}
              <br />
              <strong>Day:</strong> {sefer.gun}
              <br />
              <strong>Time:</strong> {sefer.saat}
              <br />
              <strong>Salary:</strong> {sefer.fiyat}
            </li>
          ))}
        </ul>
      )}
      <button type='button' onClick={handleBiletAl}>Buy A Ticket</button>
      <button type="button" onClick={() => navigate(-1)}>Go back to the homepage.</button>
    </div>
  );
}

export default SeferlerListesi;

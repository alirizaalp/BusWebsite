import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import userData from './usersData';


const Signup = () => {
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    tc: '',
    birthDate: '',
    gender: ''
  });

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    passwordRepeat: false,
    tc: false,
    birthDate: false,
    gender: false
  });

  const [userInformation, setUserInformation] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;

    // TC kimlik numarasının sadece 11 haneli olduğunu ve sadece sayılardan oluştuğunu doğrula
    if (name === 'tc' && !/^\d{0,11}$/.test(value)) {
      return;
    }

    // E-posta geçerliliğini kontrol et
    if (name === 'email') {
      const emailRegex = /\S+@\S+\.\S+/;
      const isValidEmail = emailRegex.test(value);
      setErrors({ ...errors, email: !isValidEmail });
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      username: !formData.username,
      email: !formData.email,
      password: !formData.password,
      passwordRepeat: !formData.passwordRepeat,
      tc: !formData.tc,
      birthDate: !formData.birthDate,
      gender: !formData.gender
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    if (formData.tc.length !== 11) {
      setErrors({ ...errors, tc: true });
      return;
    }

    // Şifrelerin eşleştiğini doğrula
    if (formData.password !== formData.passwordRepeat) {
      setErrors({ ...errors, passwordRepeat: true });
      return;
    }

    console.log('Gönderilen veriler:', formData);

    const newUserData = {
      username: formData.username,
      email: formData.email,
      birthDate: formData.birthDate,
      gender: formData.gender
    };

    userData.push(newUserData);

    setUserInformation(newUserData);

    setFormData({
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      tc: '',
      birthDate: '',
      gender: ''
    });
  };

  return (
    <div className="signup-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${errors.username ? 'error' : ''}`}>
          <label htmlFor="username">Username</label>
          <input
            placeholder="username"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className={`form-group ${errors.email ? 'error' : ''}`}>
          <label htmlFor="email">E-mail</label>
          <input
            placeholder="email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={`form-group ${errors.password ? 'error' : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            placeholder="password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className={`form-group ${errors.passwordRepeat ? 'error' : ''}`}>
          <label htmlFor="passwordRepeat">Password Repeat</label>
          <input
            placeholder="Password Repeat"
            type="password"
            id="passwordRepeat"
            name="passwordRepeat"
            value={formData.passwordRepeat}
            onChange={handleChange}
          />
        </div>
        <div className={`form-group ${errors.tc ? 'error' : ''}`}>
          <label htmlFor="tc">Turkish Identity Number</label>
          <input
            placeholder="Turkish Identity Number"
            type="text"
            id="tc"
            name="tc"
            value={formData.tc}
            onChange={handleChange}
          />
        </div>
        <div className={`form-group ${errors.birthDate ? 'error' : ''}`}>
          <label htmlFor="birthDate">Birth Date</label>
          <input
            placeholder="Birt Date"
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>
        <div className={`form-group ${errors.gender ? 'error' : ''}`}>
          <label htmlFor="gender">Gender</label>
          <select
            placeholder="Gender"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Please Select</option>
            <option value="Erkek">Male</option>
            <option value="Kadın">Female</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>

      <button type="button" onClick={() => navigate(-1)}>Go back to the homepage.</button>

      {/* Kullanıcının verilerini göstermek için bölüm */}
      {userInformation && (
        <div className="user-information">
          <h2>Registration Successfully Completed</h2>
          <p>User name: {userInformation.username}</p>
          <p>E-mail: {userInformation.email}</p>
          <p>Date Of Birth: {userInformation.birthDate}</p>
          <p>Gender: {userInformation.gender}</p>
        </div>
      )}
    </div>
  );
};

export default Signup;

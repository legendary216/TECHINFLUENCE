import "./App.css";

function App() {
  return (
    <div className="login-container">
      <h2>Access your AI verification portal</h2>
      <div className="login-card">
        <div className="profile-icon">
          <i className="fas fa-user-circle"></i>
        </div>
        <input type="text" placeholder="Enter username" className="input-field" />
        <input type="password" placeholder="Enter password" className="input-field" />
        <button className="login-button">Login</button><br></br>
        <p className="forgot-password">Forgot password?</p>
        <p className="or">OR</p>
        <p className="not-reg">If not registered, click <a href="https://reg.com" target="_blank" rel="noopener noreferrer">register</a></p>
      </div>
    </div>
  );
}
export default App;
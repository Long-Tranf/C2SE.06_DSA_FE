import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  return (
    <div className="App">
      <div class="row vh-100 g-0">
        {/* left */}
        <div class="col-lg-6 position-relative d-none d-lg-block">
          <div className="bg-holder" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/Screenshot_1.png)` }}>
          </div>
        </div>
        {/* left */}

        {/* right */}
        <div class="col-lg-6">
          <div class="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
            <div class="col col-sm-6 col-lg-7 col-xl-6">
              <div class="text-center mb-5">
                <h3 class="fw-bold">Log In</h3>
                <p class="text-secondary">Get access to your account</p>
              </div>
              {/* social login */}
              <button class="btn btn-lg btn-outline-secondary btn-online-custom w-100 mb-3">
                <i class="bx bxl-google text-danger fs-200 me-1"></i> Login with Google
              </button>
              <button class="btn btn-lg btn-outline-secondary btn-online-custom w-100 ">
                <i class="bx bxl-facebook-circle text-primary fs-200 me-1 mt-2000"></i> Login with Facebook
              </button>
              {/* social login */}

              {/* divider */}
              <div class="position-relative">
                <hr class="text-secondary divider"></hr>
                <div class="divider-content-center">Or</div>
              </div>
              {/* divider */}

              {/* form */}
              <form action="#">
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="bx bx-user"></i>
                  </span>
                  <input type="text" class="form-control form-control-lg fs-6"
                    placeholder='Username'></input>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="bx bx-lock-alt"></i>
                  </span>
                  <input type="password" class="form-control form-control-lg fs-6"
                    placeholder='Password'></input>
                </div>
                <div class="input-group mb-3 d-flex 
                justify-content-between">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input"
                      id="formCheck"></input>
                    <label for="formCheck" class="form-check-label text secondary"
                    ><small>Remember Me</small></label>
                  </div>
                  <div>
                    <small><a href='#' class="fp">Forgot Password</a></small>
                  </div>
                </div>
                <button class="btn btn-primary btn-lg w-100 mb-3">
                  Login
                </button>
              </form>
              {/* form */}
              <div class="text-center">
                <small>
                  Don't have an account? <a href="#" class="fw-bold">Sign Up</a>
                </small>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
      </div>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
    </div>

  );
}

export default Login;

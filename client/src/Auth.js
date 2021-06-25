import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import { login, register } from "./store/utils/thunkCreators";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    "@media (max-width: 800px)": {
      flexDirection: "column",
    },
  },
  bg: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      "linear-gradient(to top, rgba(134, 185, 255, 85%), rgba(58, 141, 255, 85%)), url(./assets/images/bg-img-compressed.png)",
    backgroundSize: "cover",
    height: "100vh",
    width: "40%",
    color: "white",
    textAlign: "center",
    "@media (max-width: 800px)": {
      width: "100vw",
      height: "40%",
    },
  },
  converse: {
    margin: "50px 100px 100px 100px",
  },
  speechBubble: {
    height: "100px",
    "@media (max-width: 800px)": {
      marginTop: "50px",
    },
  },
  loginOrRegister: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: "0%",
    margin: "30px",
    "@media (max-width: 800px)": {
      bottom: "0%",
    },
  },
  prompt: {
    color: "#BFBEBE",
  },
  promptBtn: {
    padding: "20px 50px",
    borderRadius: "5px",
    marginLeft: "30px",
    boxShadow: "0 0 10px #CFCECE",
    color: "#3A8DFF",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    "@media (max-width: 800px)": {
      marginTop: "40px",
    },
  },
  form: {
    width: "60%",
  },
  formField: {
    width: "100%",
    marginTop: "50px",
  },
  submitBtn: {
    backgroundColor: "#3A8DFF",
    color: "white",
    padding: "20px 75px",
  },
  submitBtnContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "75px",
  },
}));

const Auth = (props) => {
  const { user, login, register } = props;
  const classes = useStyles();

  const [authType, setAuthType] = useState("Signup");
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Box className={classes.root} container justify="center">
      <div className={classes.bg}>
        <img
          className={classes.speechBubble}
          src="./assets/icons/bubble.svg"
          alt=""
        />
        <Typography className={classes.converse} style={{ fontSize: "2.5rem" }}>
          Converse with anyone in any language
        </Typography>
      </div>

      <Box className={classes.loginOrRegister}>
        <Typography style={{ fontSize: "1.3rem" }} className={classes.prompt}>
          {authType === "Signup"
            ? "Already have an account?"
            : "Don't have an account?"}
        </Typography>
        <Button
          style={{ fontSize: "1.3rem" }}
          className={classes.promptBtn}
          onClick={() => {
            if (authType === "Signup") {
              setAuthType("Login");
            }
            if (authType === "Login") {
              setAuthType("Signup");
            }
          }}
        >
          {authType === "Signup" ? "Login" : "Create Account"}
        </Button>
      </Box>
      <Box className={classes.formContainer}>
        <form
          className={classes.form}
          onSubmit={authType === "Signup" ? handleRegister : handleLogin}
        >
          <Typography
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              whiteSpace: "nowrap",
            }}
          >
            {authType === "Signup" ? "Create an account." : "Welcome back!"}
          </Typography>
          {authType === "Signup" ? (
            <Signup formErrorMessage={formErrorMessage} classes={classes} />
          ) : (
            <Login classes={classes} />
          )}
        </form>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
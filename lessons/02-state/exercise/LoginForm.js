import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  let [checked, setChecked] = useState(false)
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState(null)

  return (
    <form
      onSubmit={async event => {
        event.preventDefault()
        setLoading(true)
        setError(null)
        let [emailNode, passwordNode] = event.target.elements
        try {
          await login(emailNode.value, passwordNode.value)
        } catch (e) {
          setError(e.message)
        }
      }}
    >
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={checked ? "text" : "password"}
        className="inputField"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            onChange={() => {
              setChecked(!checked)
            }}
            type="checkbox"
            defaultChecked={checked}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        <FaSignInAlt />
        <span>{loading ? "Loading" : "Login"}</span>
      </TabsButton>
      {error && (
        <p
          style={{
            color: "red",
            marginBottom: 0
          }}
        >
          {error}
        </p>
      )}
    </form>
  )
}

## Email collector UI

- all about the state management for this component
- the UI/styes component themselves - will be taken from a ui library
- this component will receive all values and handlers/callbacks from a parent smart component via props
  ( mode, field values, set field values, submit handler, loading, and error status etc. )

### Mode

\*\*
there are several mode values that will describe the component behaviour:

- `"email_collect"` - top section: the component will display email input and email submit button `Subscribe`,
  and bottom section: will display the privacy and cookie policies information
- `"password"` - top section: the component will display password input and password submit button `Sing in`,
  and bottom section: will display nav buttons for user's signin help, `Register` and `Forgot password`
- `"current_user_email"` - top section: the component will display email input with the existing user email value
  and email submit button `Subscribe`; and bottom section: will display the button to subscribe with another email adress;

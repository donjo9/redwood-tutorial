import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'
import { Flash, useFlash, useMutation } from '@redwoodjs/web'
import BlogLayout from 'src/layouts/BlogLayout/BlogLayout'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' })
  const { addMessage } = useFlash()
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      addMessage('Thank you for your submission!', {
        style: {
          backgroundColor: 'green',
          color: 'white',
          padding: '1rem',
        },
      })
      formMethods.reset()
    },
  })
  const onSubmit = async (data) => {
    try {
      await create({ variables: { input: data } })
      console.dir(data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <BlogLayout>
      <Flash timeout={2000} />
      <Form
        onSubmit={onSubmit}
        validation={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
      >
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        ></TextField>
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          errorClassName="error"
          validation={{
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address',
            },
            required: true,
          }}
        ></TextField>
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          errorClassName="error"
          validation={{ required: true }}
        ></TextAreaField>
        <FieldError name="message" className="error" />
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
        />
        <Submit disabled={loading}>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage

export default function ({ redirect }) {
  // If the user is not authenticated
  if (!localStorage.getItem('auth')) {
    return redirect('/login')
  }
}

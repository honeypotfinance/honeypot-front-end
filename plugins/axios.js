export default function ({ $axios, redirect }) {
  $axios.onError(err => {
    if (err.response.status === 500) {
      redirect('/sorry')
    }
  })
}

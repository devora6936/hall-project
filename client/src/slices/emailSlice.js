import apiSlice from "./apiSlice";

const EmailApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        sendEmail: build.mutation({
            query: (text) => ({
                url: '/api/email',
                method: 'POST',
                body: text
            }),
        })
    })

})


export default EmailApiSlice
export const {useSendEmailMutation}=EmailApiSlice
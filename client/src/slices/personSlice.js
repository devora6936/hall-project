import apiSlice from "./apiSlice";

const personApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getPersons: build.query({
            query: () => ({
                url: '/api/persons',
            }),
            providesTags: ['persons']
        }),

        createPerson: build.mutation({
            query: (person) => ({
                url: '/api/persons',
                method: 'POST',
                body: person
            }),
            invalidatesTags: ['persons']
        }),

        

        updatePerson: build.mutation({
            query: (person) => ({
                url: '/api/persons',
                method: 'PUT',
                body: person
            }),
            invalidatesTags: ['persons']
        }),

        
        
    })

})


export default personApiSlice
export const { useCreatePersonMutation, useGetPersonsQuery, useUpdatePersonMutation } = personApiSlice
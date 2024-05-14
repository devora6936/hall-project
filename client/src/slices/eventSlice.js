import apiSlice from "./apiSlice";

const eventApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getEvents: build.query({
            query: () => ({
                url: '/api/events',
            }),
            providesTags: ['events']
        }),

        getEventsByDAte: build.query({
            query: (date) => ({
                url: '/api/events/byDate/' + date,
                method: 'GET',
            }),
            providesTags: ['eventsByDate']

        }),

        getEventsByRange: build.query({
            query: (filter) => ({
                url: '/api/events/byRange/' + filter.startDate + '/' + filter.endDate,
                method: 'GET',
            }),
            providesTags: ['eventsByRange']

        }),

        getEventsByWeek: build.query({
            query: () => ({
                url: '/api/events/byWeek',
                method: 'GET',
            }),
            providesTags: ['eventsByWeek']

        }),

        createEvent: build.mutation({
            query: (event) => ({
                url: '/api/events',
                method: 'POST',
                body: event
            }),
            invalidatesTags: ['events', 'eventsByDate', 'eventsByWeek','eventsByRange']

        }),

        updateEvent: build.mutation({
            query: (event) => ({
                url: '/api/events',
                method: 'PUT',
                body: event
            }),
            invalidatesTags: ['events', 'eventsByDate', 'eventsByWeek','eventsByRange']

        }),
        
        deleteEvent: build.mutation({
            query: (id) => ({
                url: '/api/events/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ['events', 'eventsByDate', 'eventsByWeek','eventsByRange']
        })
    })

})


export default eventApiSlice
export const { useGetEventsByDAteQuery, useDeleteEventMutation, useCreateEventMutation, useUpdateEventMutation, useGetEventsQuery, useGetEventsByWeekQuery,useGetEventsByRangeQuery } = eventApiSlice
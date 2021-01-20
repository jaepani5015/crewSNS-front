import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: false,
    Post: []
};

const getImageUrl = 'https://api.unsplash.com/photos/?client_id=gG8KyJv0AZDILSshYX698vmYIr7BRoY8YhAp4204who';
export const fetchPost = createAsyncThunk(
    'post/fetchPost',
    async () => {
        const payload = await axios.get(getImageUrl).then(res => res.data);
        return payload;
    }
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        registReply: ((state, action) => {
            const {inputReply, userNickname, time, index} = action.payload;
            console.log(inputReply, userNickname, time, index);

            state.Post[index].postReply.push({
                replyUser: userNickname,
                replyContent: inputReply,
                replyCreateDate: time
            });
        }),
    },
    extraReducers: {
        [fetchPost.pending]: (state, action) => {
            console.log(`pending :: ${action}`);
            state.loading = true;
        },
        [fetchPost.fulfilled]: (state, action) => {
            action.payload.forEach((data, key) => {
                state.Post.push({
                    postUser: action.payload[key].user.instagram_username,
                    postTitle: action.payload[key].user.name,
                    postContent: action.payload[key].user.name,
                    postCreateDate: action.payload[key].user.updated_at,
                    postImage: [action.payload[key].urls.regular],
                    postReply: [{
                        replyUser: 'jaepani',
                        replyContent: 'hi my name is jaepani',
                        replyCreateDate: action.payload[key].user.updated_at,
                    }]
                });
            });
        },
        [fetchPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.Post = []
            console.log(`rejected :: ${action.error.message()}`);
        }
    }
});

export const {registReply, imageUpload} = postSlice.actions;
export default postSlice.reducer;


// const initialState = {
//     loading: false,
//     error: false,
//     Post: [{
//         postUser: null,
//         postTitle: null,
//         postContent: null,
//         postCreateDate: null,
//         postImage: [],
//         postReply: [
//             {
//                 replyUser: null,
//                 replyContent: null,
//                 replyCreateDate: null,
//             }
//         ]
//     }]
// };
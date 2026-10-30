import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const data = await photoService.publishPhoto(photo, token);

      if (data.erros) {
        return thunkAPI.rejectWithValue(data.erros[0]);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getUserPhotos = createAsyncThunk(
  "photo/getUserPhotos",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await photoService.getUserPhotos(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const data = await photoService.deletePhoto(id, token);

      if (data.erros) {
        return thunkAPI.rejectWithValue(data.erros[0]);
      }

      return {
        id,
        message: data.message,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updatePhoto = createAsyncThunk(
  "photo/update",
  async ({ id, title }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const data = await photoService.updatePhoto({ title }, id, token);

      if (data.erros) {
        return thunkAPI.rejectWithValue(data.erros[0]);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getPhoto = createAsyncThunk(
  "photo/getphoto",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await photoService.getPhoto(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getPhotos = createAsyncThunk(
  "photo/getall",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await photoService.getPhotos(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const like = createAsyncThunk("photo/like", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.like(id, token);

    if (data.erros) {
      return thunkAPI.rejectWithValue(data.erros[0]);
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const comment = createAsyncThunk(
  "photo/comment",
  async (photoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const data = await photoService.comment(photoData, photoData.id, token);

      if (data.erros) {
        return thunkAPI.rejectWithValue(data.erros[0]);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const searchPhotos = createAsyncThunk(
  "photo/search",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const data = await photoService.searchPhotos(query, token);

      if (data.erros) {
        return thunkAPI.rejectWithValue(data.erros[0]);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.success = true),
          (state.error = null),
          (state.photo = action.payload),
          state.photos.unshift(state.photo),
          (state.message = "Foto atualizada com sucesso !"));
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = action.payload),
          (state.photo = {}));
      })
      .addCase(getUserPhotos.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.success = true),
          (state.error = null),
          (state.photos = action.payload));
      })
      .addCase(getUserPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.success = true),
          (state.error = null),
          (state.photos = state.photos.filter(
            (photo) => photo._id !== action.payload.id,
          )),
          (state.message = action.payload.message));
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = action.payload),
          (state.photo = {}));
      })
      .addCase(updatePhoto.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = state.photos.map((photo) => {
          if (photo._id === action.payload.id) {
            return {
              ...photo,
              title: action.meta.arg.title,
            };
          }

          return photo;
        });
        state.message = action.payload.message;
      })
      .addCase(getPhoto.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(getPhoto.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.success = true),
          (state.error = null),
          (state.photo = action.payload));
      })
      .addCase(getPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPhotos.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.success = true),
          (state.error = null),
          (state.photos = action.payload));
      })
      .addCase(getPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(like.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(comment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo.comments.push(action.payload.comment);
        state.message = action.payload.message;
      })
      .addCase(comment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchPhotos.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.success = true),
          (state.error = null),
          (state.photos = action.payload));
      })
      .addCase(searchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;

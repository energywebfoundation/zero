/*
 * Generated by orval v5.4.12 🍺
 * Do not edit manually.
 * Energy Web Zero API
 * OpenAPI spec version: 0.3
 */
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from 'react-query';
import type {
  UploadFileResponseDto,
  UploadFileDto,
  FileMetadataDto,
  UpdateFileMetadataDto,
} from './energyWebZeroAPI.schemas';
import filesControllerUploadFilesMutator from '../response-type';
import filesControllerGetFileMetadataMutator from '../response-type';
import filesControllerUpdateFileMetadataMutator from '../response-type';
import filesControllerGetFileContentMutator from '../response-type';
import filesControllerGetImageMutator from '../response-type';

type AsyncReturnType<
  T extends (...args: any) => Promise<any>,
  U = unknown
> = T extends (...args: any) => Promise<infer R> ? (U extends R ? U : R) : any;

type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P
) => any
  ? P
  : never;

export const filesControllerUploadFiles = <TData = UploadFileResponseDto>(
  uploadFileDto: UploadFileDto,
  options?: SecondParameter<typeof filesControllerUploadFilesMutator>
) => {
  const data = new FormData();
  data.append('file', uploadFileDto.file);
  return filesControllerUploadFilesMutator<TData>(
    {
      url: `/api/files`,
      method: 'post',
      responseType: 'json',
      data,
    },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const useFilesControllerUploadFiles = <
  TData = AsyncReturnType<
    typeof filesControllerUploadFiles,
    UploadFileResponseDto
  >,
  TError = unknown,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    TData,
    TError,
    { data: UploadFileDto },
    TContext
  >;
  request?: SecondParameter<typeof filesControllerUploadFilesMutator>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options || {};

  return useMutation<TData, TError, { data: UploadFileDto }, TContext>(
    (props) => {
      const { data } = props || {};

      return filesControllerUploadFiles<TData>(data, requestOptions);
    },
    mutationOptions
  );
};
export const filesControllerGetFileMetadata = <TData = FileMetadataDto>(
  id: string,
  options?: SecondParameter<typeof filesControllerGetFileMetadataMutator>
) => {
  return filesControllerGetFileMetadataMutator<TData>(
    { url: `/api/files/${id}/metadata`, method: 'get' },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const getFilesControllerGetFileMetadataQueryKey = (id: string) => [
  `/api/files/${id}/metadata`,
];

export const useFilesControllerGetFileMetadata = <
  TQueryFnData = AsyncReturnType<
    typeof filesControllerGetFileMetadata,
    FileMetadataDto
  >,
  TError = unknown,
  TData = TQueryFnData
>(
  id: string,
  options?: {
    query?: UseQueryOptions<TQueryFnData, TError, TData>;
    request?: SecondParameter<typeof filesControllerGetFileMetadataMutator>;
  }
) => {
  const { query: queryOptions, request: requestOptions } = options || {};

  const queryKey =
    queryOptions?.queryKey ?? getFilesControllerGetFileMetadataQueryKey(id);

  const query = useQuery<TQueryFnData, TError, TData>(
    queryKey,
    () => filesControllerGetFileMetadata<TQueryFnData>(id, requestOptions),
    { enabled: !!id, ...queryOptions }
  );

  return {
    queryKey,
    ...query,
  };
};

export const filesControllerUpdateFileMetadata = <TData = FileMetadataDto>(
  id: string,
  updateFileMetadataDto: UpdateFileMetadataDto,
  options?: SecondParameter<typeof filesControllerUpdateFileMetadataMutator>
) => {
  return filesControllerUpdateFileMetadataMutator<TData>(
    {
      url: `/api/files/${id}/metadata`,
      method: 'put',
      data: updateFileMetadataDto,
    },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const useFilesControllerUpdateFileMetadata = <
  TData = AsyncReturnType<
    typeof filesControllerUpdateFileMetadata,
    FileMetadataDto
  >,
  TError = unknown,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    TData,
    TError,
    { id: string; data: UpdateFileMetadataDto },
    TContext
  >;
  request?: SecondParameter<typeof filesControllerUpdateFileMetadataMutator>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options || {};

  return useMutation<
    TData,
    TError,
    { id: string; data: UpdateFileMetadataDto },
    TContext
  >((props) => {
    const { id, data } = props || {};

    return filesControllerUpdateFileMetadata<TData>(id, data, requestOptions);
  }, mutationOptions);
};
export const filesControllerGetFileContent = <TData = unknown>(
  id: string,
  options?: SecondParameter<typeof filesControllerGetFileContentMutator>
) => {
  return filesControllerGetFileContentMutator<TData>(
    { url: `/api/files/${id}`, method: 'get' },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const getFilesControllerGetFileContentQueryKey = (id: string) => [
  `/api/files/${id}`,
];

export const useFilesControllerGetFileContent = <
  TQueryFnData = AsyncReturnType<typeof filesControllerGetFileContent, unknown>,
  TError = unknown,
  TData = TQueryFnData
>(
  id: string,
  options?: {
    query?: UseQueryOptions<TQueryFnData, TError, TData>;
    request?: SecondParameter<typeof filesControllerGetFileContentMutator>;
  }
) => {
  const { query: queryOptions, request: requestOptions } = options || {};

  const queryKey =
    queryOptions?.queryKey ?? getFilesControllerGetFileContentQueryKey(id);

  const query = useQuery<TQueryFnData, TError, TData>(
    queryKey,
    () => filesControllerGetFileContent<TQueryFnData>(id, requestOptions),
    { enabled: !!id, ...queryOptions }
  );

  return {
    queryKey,
    ...query,
  };
};

export const filesControllerGetImage = <TData = unknown>(
  id: string,
  options?: SecondParameter<typeof filesControllerGetImageMutator>
) => {
  return filesControllerGetImageMutator<TData>(
    { url: `/api/files/images/${id}`, method: 'get' },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const getFilesControllerGetImageQueryKey = (id: string) => [
  `/api/files/images/${id}`,
];

export const useFilesControllerGetImage = <
  TQueryFnData = AsyncReturnType<typeof filesControllerGetImage, unknown>,
  TError = unknown,
  TData = TQueryFnData
>(
  id: string,
  options?: {
    query?: UseQueryOptions<TQueryFnData, TError, TData>;
    request?: SecondParameter<typeof filesControllerGetImageMutator>;
  }
) => {
  const { query: queryOptions, request: requestOptions } = options || {};

  const queryKey =
    queryOptions?.queryKey ?? getFilesControllerGetImageQueryKey(id);

  const query = useQuery<TQueryFnData, TError, TData>(
    queryKey,
    () => filesControllerGetImage<TQueryFnData>(id, requestOptions),
    { enabled: !!id, ...queryOptions }
  );

  return {
    queryKey,
    ...query,
  };
};

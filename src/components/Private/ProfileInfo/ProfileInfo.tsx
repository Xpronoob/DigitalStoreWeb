import { FormValues } from '@/components/Public/RegisterForm/registerFormModel';
import { useFetch } from '@/hooks/useFetch';

function ProfileInfo() {
  const profileFetch = useFetch<FormValues>('/auth/profile');

  const { data, loading, error } = profileFetch;

  return (
    <>
      <p>Profile</p>

      {/* {loading && <p>Loading...</p>} */}
      {data && <p>{JSON.stringify(data)}</p>}
      {error && <p>Error loading profile</p>}
    </>
  );
}

export default ProfileInfo;

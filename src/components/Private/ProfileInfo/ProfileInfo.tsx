import { useQuery } from '@/hooks/useQuery';
import { userModel } from '@/models/user.models';

function ProfileInfo() {
  const { data, loading, error } = useQuery<userModel>('/auth/profile', 'GET');

  return (
    <>
      <p>Profile</p>

      {loading && <p>Loading...</p>}
      {data && <p>{JSON.stringify(data)}</p>}
      {error && <p>Error loading profile</p>}
    </>
  );
}

export default ProfileInfo;

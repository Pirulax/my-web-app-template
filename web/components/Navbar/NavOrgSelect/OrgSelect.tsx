'use client';

import { useTranslations } from 'next-intl';

export const OrgSelect = () => {
  const g = useTranslations();

  //const { data: list } = authClient.useListOrganizations();
  //const { data: active } = authClient.useActiveOrganization();
  return null;
  //return (
  //  <ControlLabel
  //    icon={<IconUsers size={18} />}
  //    label={
  //      <Stack gap={0}>
  //        <Text c="dimmed" size="xs">
  //          Organizacioja
  //        </Text>
  //        <Text size="sm" fw={500}>
  //          Temerin
  //        </Text>
  //      </Stack>
  //    }
  //  />
  //);

  //const session = useSuspenseSession();
  //const { data: orgs } = useSuspenseQuery({
  //  queryKey: ['user-orgs', session.data?.user.id],
  //  queryFn: async () => {
  //    if (!session.data?.user.id) {
  //      return null;
  //    }
  //    return await authClient.organization.list({}, { throw: true });
  //  },
  //});
};

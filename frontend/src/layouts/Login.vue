<script setup lang="ts">
import { watch } from "vue";
import { useUserStore } from "~/store/user";

export function useLoginWatch() {
  const userStore = useUserStore();
  const $router = useRouter();
  const userId = userStore.user_id;

  watch(
    () => userId,
    (newUserId) => {
      if (newUserId === 0) {
        $router.push("/");
      }
    }
  );
}
</script>

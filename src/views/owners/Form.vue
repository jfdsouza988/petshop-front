<template>
  <section>
    <form @submit.prevent="save">
      <div class="field">
        <label for="ownerName" class="label">
          Nome:
        </label>
        <input type="text" class="input" v-model="ownerName" id="ownerName" />
      </div>
      <div class="field">
        <label for="ownerPhone" class="label">
          Número de telefone:
        </label>
        <input type="text" class="input" v-model="ownerPhone" id="ownerPhone" />
      </div>
      <div class="field">
        <label for="ownerAddress" class="label">
          Endereço:
        </label>
        <input type="text" class="input" v-model="ownerAddress" id="ownerAddress" />
      </div>
      <div class="field">
        <button class="button" type="submit">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { NotificationType } from '@/interfaces/INotification';
import useNotificator from '@/hooks/notificator';
import { useRouter } from 'vue-router';
import IOwner from '@/interfaces/IOwner';
import { REGISTER_OWNER, UPDATE_OWNER } from '@/store/modules/owner/types';
export default defineComponent({
  name: 'Form',
  props: {
    id: {
      type: String,
    }
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notify } = useNotificator();
    const ownerName = ref('');
    const ownerPhone = ref('');
    const ownerAddress = ref('');
    if (props.id) {
      const owner = store.state.owner.owners.find((owner: IOwner) => owner.id === props.id);
      ownerName.value = owner?.name || '';
      ownerPhone.value = owner?.phone || '';
      ownerAddress.value = owner?.address || '';
    }
    const handleSuccess = () => {
      ownerName.value = '';
      ownerPhone.value = '';
      ownerAddress.value = '';
      notify(NotificationType.SUCCESS, 'Sucesso', 'Cliente salvo com sucesso');
      router.push('/owners');
    };
    const save = () => {
      if (props.id) {
        store.dispatch(UPDATE_OWNER, {
          id: props.id,
          name: ownerName.value,
          phone: ownerPhone.value,
          address: ownerAddress.value
        }).then(() => {
          handleSuccess();
        });
      } else {
        const owner = {
          name: ownerName.value,
          phone: ownerPhone.value,
          address: ownerAddress.value
        };
        store.dispatch(REGISTER_OWNER, owner).then(() => {
          handleSuccess();
        });
      }
    };
    return {
      ownerName,
      ownerPhone,
      ownerAddress,
      save
    }
  }
});
</script>
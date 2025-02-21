<script setup lang="ts">
import type { Todo } from '@/types'
import TrashIcon from '@/assets/trash.svg'
import { deleteTodo, updateTodo } from '@/api/todo'
interface Props {
  todo: Todo
}
interface Emit {
  onUpdate: []
}
const props = defineProps<Props>()

const emit = defineEmits<Emit>()

function handleDeleteTodo() {
  deleteTodo(props.todo.id)
  emit('onUpdate')
}
function handleUpdateTodo() {
  const params = {
    id: props.todo.id,
    checked: !props.todo.checked,
  }
  updateTodo(params)
  emit('onUpdate')
}
</script>
<template>
  <li :key="props.todo.id" class="flex items-center space-x-2 gap-2">
    <input
      @click="handleUpdateTodo"
      :checked="props.todo.checked"
      type="checkbox"
      class="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
    />
    <div class="flex-1 grid grid-cols-1 gap-0">
      <label :class="{ 'line-through': props.todo.checked }">
        {{ props.todo.title }}
      </label>
      <label class="text-xs">
        {{ props.todo.createdAt }}
      </label>
    </div>

    <button @click="handleDeleteTodo">
      <img :src="TrashIcon" width="20" />
    </button>
  </li>
</template>

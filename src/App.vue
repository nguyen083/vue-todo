<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import TodoCard from './components/TodoCard.vue'
import type { Todo } from './types'
import { createTodo, getTodos } from './api/todo'

const title = ref<string>('')
const input = useTemplateRef('input-title')
const sortByCreatedAtASC = ref<boolean>(true)
const todos = ref<Todo[]>([]) // mảng todo

function fetchTodos() {
  todos.value = getTodos(sortByCreatedAtASC.value)
}

function handleAddTodo() {
  if (title.value) {
    createTodo(title.value)
    fetchTodos()
    input.value?.focus()
    title.value = ''
  }
}

onMounted(() => {
  fetchTodos()
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 py-6 flex flex-col justify-center sm:py-12 items-center"
  >
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div class="text-3xl font-bold text-center text-gray-900 pb-5">TODO</div>
              <div class="grid grid-cols-1 gap-4">
                <div class="flex items-center space-x-2">
                  <input
                    @keyup.enter="handleAddTodo"
                    ref="input-title"
                    v-model="title"
                    type="text"
                    placeholder="Nhập việc cần làm"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-s-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <button
                    @click="handleAddTodo"
                    class="px-4 py-2 text-white border-0 border-e-cyan-500 bg-cyan-500 rounded-e-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  >
                    Thêm
                  </button>
                </div>
                <div class="flex justify-end">
                  <select
                    v-model="sortByCreatedAtASC"
                    @change="fetchTodos"
                    class="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option :value="true">Mới nhất</option>
                    <option :value="false">Cũ nhất</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <ul v-for="todo in todos" :key="todo.id" class="space-y-2">
                <TodoCard :todo="todo" @on-update="fetchTodos" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

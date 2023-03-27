#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char** fizzBuzz(int start, int end, int* returnSize) {
    char** ar = malloc((end - start + 1) * sizeof(char*));
    *returnSize = end - start + 1;

    for (int i = start; i <= end; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            ar[i - start] = "FizzBuzz";
        } else if (i % 3 == 0) {
            ar[i - start] = "Fizz";
        } else if (i % 5 == 0) {
            ar[i - start] = "Buzz";
        } else {
            char buffer[10];
            sprintf(buffer, "%d", i);
            ar[i - start] = strdup(buffer);
        }
    }

    return ar;
}

int main() {
    int size;
    char** results = fizzBuzz(1, 20, &size);

    for (int i = 0; i < size; i++) {
        printf("%s\n", results[i]);
        free(results[i]);
    }

    free(results);
    return 0;
}

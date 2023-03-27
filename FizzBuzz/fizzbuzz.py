class FizzBuzz:
    def __init__(self):
        pass
    
    def fizz_buzz(self, start, end):
        ar = []
        
        index = start
        
        while index <= end:
            if index % 3 == 0 and index % 5 == 0:
                ar.append("FizzBuzz")
            elif index % 3 == 0:
                ar.append("Fizz")
            elif index % 5 == 0:
                ar.append("Buzz")
            else:
                ar.append(str(index))
            
            index += 1
        
        return ar

# Example usage
fizz_buzz_game = FizzBuzz()
results = fizz_buzz_game.fizz_buzz(1, 100)
print(results)

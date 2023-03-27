import scala.collection.mutable.ArrayBuffer

object FizzBuzz {
  def main(args: Array[String]): Unit = {
    val fizzBuzz = new FizzBuzz()
    val results = fizzBuzz.fizzBuzz(1, 100)
    println(results)
  }
}

class FizzBuzz {
  def fizzBuzz(start: Int, end: Int): ArrayBuffer[String] = {
    val ar = ArrayBuffer[String]()

    var index = start

    while (index <= end) {
      if (index % 3 == 0 && index % 5 == 0) {
        ar += "FizzBuzz"
      } else if (index % 3 == 0) {
        ar += "Fizz"
      } else if (index % 5 == 0) {
        ar += "Buzz"
      } else {
        ar += index.toString
      }

      index += 1
    }

    ar
  }
}

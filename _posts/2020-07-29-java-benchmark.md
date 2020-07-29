---
title: JMH(Java Microbenchmark Harness) 사용법
category: Technical
tags: [Java, Benchmark, JMH]
---

개발을 진행하다가 보면, 성능문제를 해결해야 하는 경우는 매우 많다. 

성능 문제를 해결하기 위해서는 우선 성능을 측정해야하며, 성능을 측정하는 방법와 도구는 셀수도 없이 많다.<br>
대부분의 경우 개발환경 또는 운영환경에 어플리케이션이 배포가 되고, Stress Test를 진행하여 성능을 측정한다.<br>
이러한 방법은 매우 일반적이며 어플리케이션의 성능을 개선하기 위해서는 당연히 수행해야 하는 작업이다.

이러한 성능 도구는 어플리케이션의 기능 수행 측면에서의 성능 측정이고, 
일부 로직에 대한 성능을 측정하고 비교하기에는 무거운 감이 없지 않다.<br>
개발을 하다보면, 특정 코드에 대한 간단한 비교가 필요하기도 하고, 학습을 위해 각 코드에 대한 
성능을 비교해야 할 경우도 많이 있을 것이다. 이렇듯 코드에 대한 성능측정을 하기 위한 방법을 찾던 중 
JMH(Java Microbenchmark Harness)란 도구를 알게 되어 사용법을 정리해 본다.

JMH를 통해 벤치마킹 테스트를 하기 위해서는 Project를 생성해야 한다. 만약, 이미 만들어진 프로젝트에 
JMH을 사용하려면 Maven Dependency를 추가하면 된다.

**Maven Project 생성**
```bash
$ mvn archetype:generate \
    -DinteractiveMode=false \ 
    -DarchetypeGroupId=org.openjdk.jmh \ 
    -DarchetypeArtifactId=jmh-java-benchmark-archetype \ 
    -DgroupId=com.happl.test \
    -DartifactId=code-benchmark \
    -Dversion=1
```
**Maven Dependency**
```xml
  <dependency>
    <groupId>org.openjdk.jmh</groupId>
    <artifactId>jmh-core</artifactId>
    <version>1.19</version>
  </dependency>
  <dependency>
    <groupId>org.openjdk.jmh</groupId>
    <artifactId>jmh-generator-annprocess</artifactId>
    <version>1.19</version>
  </dependency>
```

성능 측정을 위해서는 JMH에서 지원하는 Annotation을 사용하여 코드를 작성하면 된다. 예제는 아래와 같다.
```java
@State(Scope.Thread)
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
public class LoopTest {
	@Setup
	public void init() {
        // 성능 측정 전 사전에 필요한 작업		
	}

	@Benchmark
	public void originLoopWithGetSize() {
        // 성능을 측정할 코드 작성
	}

    public static void main(String[] args) throws IOException, RunnerException {
        Options opt = new OptionsBuilder()
                .include(LoopTest.class.getSimpleName())
                .warmupIterations(10)           // 사전 테스트 횟수
                .measurementIterations(10)      // 실제 측정 횟수
                .forks(1)                       // 
                .build();
        new Runner(opt).run();                  // 벤치마킹 시작
    }
}
``` 

측정이 완료되면 다음과 같은 결과가 출력된다.
```bash
# Run complete. Total time: 00:01:43

Benchmark                       Mode  Cnt  Score   Error  Units
LoopTest.forEach                avgt   10  0.990 ± 0.096  ms/op
LoopTest.forEachByJdk8          avgt   10  0.703 ± 0.160  ms/op
LoopTest.forEachByStream        avgt   10  0.561 ± 0.057  ms/op
LoopTest.originLoop             avgt   10  0.634 ± 0.117  ms/op
LoopTest.originLoopWithGetSize  avgt   10  0.876 ± 0.093  ms/op
```
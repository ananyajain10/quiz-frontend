import { mount } from "@vue/test-utils";
import Splash from "@/components/Splash.vue";

describe("Splash.vue", () => {
  const title = "Geometry Quiz";
  const subject = "Maths";
  const quizType = "assessment";
  const maxQuestionsAllowedToAttempt = 3;
  const grade = "8";
  const maxMarks = 30;
  const quizTimeLimit = 3;
  const test_purpose = "Full Test";
  const wrapper = mount(Splash, {
    props: {
      title,
      subject,
      quizType,
      maxQuestionsAllowedToAttempt,
      grade,
      maxMarks,
      quizTimeLimit,
      test_purpose
    },
  });

  it("renders props correctly", () => {
    expect(wrapper.find('[data-test="title"]').text()).toBe(title);
    expect(wrapper.find('[data-test="subject"]').text()).toBe(subject);
    expect(wrapper.find('[data-test="test-purpose"]').text()).toBe(test_purpose);
    expect(wrapper.find('[data-test="num-questions"]').text()).toContain(maxQuestionsAllowedToAttempt + "");
    expect(wrapper.find('[data-test="num-questions"]').text()).toContain(quizTimeLimit + "");
    expect(wrapper.find('[data-test="total-marks"]').text()).toContain(maxMarks + "");
  });

  it("disables the start button if session data has not been fetched", async () => {
    await wrapper.setProps({ isFirstSession: null })
    await wrapper.find('[data-test="startQuiz"]').trigger("click");
    expect(wrapper.emitted()).toEqual({});
  })

  it("emits start when start button is active and clicked", async () => {
    await wrapper.setProps({ isFirstSession: true })
    await wrapper.find('[data-test="startQuiz"]').trigger("click");
    expect(wrapper.emitted()).toHaveProperty("start");
  });

  describe("Test Paper Pattern", () => {
    beforeEach(async () => {
      const questionSets = [
        {
          _id:"64bf709a8b60731c693290c1",
          title: "Question Set 0",
          description: "You may attempt all questions",
          maxQuestionsAllowedToAttempt: 4,
        },
        {
          _id:"64bf709a8b60731c693290c8",
          title: "Question Set 1",
          description: "You may attempt all questions",
          maxQuestionsAllowedToAttempt: 4,
        },
      ];
      const currentQuestionIndex = 1;
      await wrapper.setProps({
        questionSets,
        currentQuestionIndex,
      });
    });

    it("displays question set title", () => {
      let questionSetIndex = 0;
      expect(wrapper.find(`[data-test="questionSetTitle-${questionSetIndex}"]`).text()).toBe("Question Set 0");

      questionSetIndex = 1;
      expect(wrapper.find(`[data-test="questionSetTitle-${questionSetIndex}"]`).text()).toBe("Question Set 1");
    });

    it("displays instruction text for each set", () => {
      let questionSetIndex = 0;
      expect(wrapper.find(`[data-test="questionSetInstruction-${questionSetIndex}"]`).text()).toBe("You may attempt all questions");

      questionSetIndex = 1;
      expect(wrapper.find(`[data-test="questionSetInstruction-${questionSetIndex}"]`).text()).toBe("You may attempt all questions");
    });
  });

});

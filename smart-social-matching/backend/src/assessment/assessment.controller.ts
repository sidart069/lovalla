import { Controller, Post, Body } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentDto } from './dto/assessment.dto';

@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post('submit')
  async submitAssessment(@Body() assessmentDto: AssessmentDto): Promise<any> {
    return await this.assessmentService.processAssessment(assessmentDto);
  }
}
